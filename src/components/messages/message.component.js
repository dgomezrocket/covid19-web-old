/******************************************** @format **************************************/

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getPatients } from "../../actions/patientsDoctor";
import { getMessages, sendMessage } from "../../actions/messagesPatient";
import { delayFunction } from "../../actions/generalActions";
import { FaReply, FaCheck, FaClock } from "react-icons/fa";

import "./css/message.css";

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.loadPatients = this.loadPatients.bind(this);
    this.loadMessages = this.loadMessages.bind(this);

    this.state = {
      patientsDoctor: undefined,
      messages: undefined,
      idPatient: undefined,
      isMessageLoading: false,
      messageText: "",
    };
  }

  loadPatients() {
    const { dispatch, user, patientsDoctor } = this.props;
    dispatch(getPatients(user.account.person.id)).then(() => {
      this.setState({
        patientsDoctor: patientsDoctor,
      });
      if (
        this.state.patientsDoctor != undefined &&
        this.state.patientsDoctor.length == 0
      ) {
        document.getElementById("sinMensajes").style.display = "block";
        document.getElementById("messages").style.display = "none";
      }
    });
  }

  loadingMessages() {
    const { messages } = this.props;
    if (this.state.isMessageLoading) {
      if (!!messages) {
        delayFunction(() => {
          this.setState({
            messages: messages,
            isMessageLoading: false,
          });
        });
      }
    }
  }

  loadMessages(patientId) {
    const { dispatch, user } = this.props;
    this.setState({
      idPatient: patientId,
    });
    document.getElementById("messageText").classList.remove("invisible");
    document.getElementById("sendMessageBtn").classList.remove("invisible");

    dispatch(getMessages(user.account.person.id, patientId)).then(() => {
      this.setState({
        isMessageLoading: true,
      });
    });
  }

  setMessageText(value) {
    this.setState({
      messageText: value,
    });
  }

  sendMessage() {
    const { dispatch, user } = this.props;

    dispatch(
      sendMessage(
        user.account.person.id,
        this.state.idPatient,
        this.state.messageText
      )
    ).then(() => {
      this.setMessageText("");
      this.loadMessages(this.state.idPatient);
    });
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (!this.state.patientsDoctor) {
      this.loadPatients();
    }

    this.loadingMessages();

    const onHandleMessageText = (event) => {
      this.setMessageText(event.target.value);
    };

    const loadMessageAux = (patientId) => {
      this.loadMessages(patientId);
    };

    const getHora = (fecha) => {
      if (fecha === null || fecha === undefined) {
        let d = new Date();
        return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      } else {
        let hora = fecha.substr(11, 8);
        return hora;
      }
    };

    return (
      <div className="content">
        <div className="container">
          <header className="jumbotron center-jumbotron">
            <h3 className="center">Mensajes</h3>
          </header>
        </div>

        <div id="sinMensajes" style={{ display: "none" }}>
          <h4 className="center">No tiene mensajes</h4>
        </div>

        <div id="messages">
          <div className="card grey chat-room">
            <div className="card-body">
              <div className="row px-lg-2 px-2">
                <div className="col-md-6 col-xl-4 px-0 mb-4 mb-md-0 scrollable-friends-list">
                  <h6 className="font-weight-bold mb-3 text-lg-left">
                    Pacientes
                  </h6>
                  <div className="friend-list-scrollable">
                    <ul className="list-group friend-list">
                      {this.state.patientsDoctor?.map((patient) => (
                        <PatientRow
                          key={patient.id}
                          patient={patient}
                          loadMessages={loadMessageAux}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-md-6 col-xl-8 pl-md-3 mt-4 mt-md-0 px-lg-auto">
                  <div className="scrollable-chat">
                    <ul className="list-unstyled pl-3 pr-3">
                      {this.state.messages?.map((message) => (
                        <ChatMessage
                          key={message.id}
                          message={message}
                          getHora={getHora}
                        />
                      ))}
                    </ul>
                  </div>
                  <div className="form-group basic-textarea">
                    <textarea
                      className="form-control pl-2 my-0 invisible"
                      id="messageText"
                      rows="3"
                      placeholder="Type your message here..."
                      value={this.state.messageText}
                      onChange={onHandleMessageText}
                    />
                    <button
                      id="sendMessageBtn"
                      className="btn btn-info btn-sm float-right mt-4 invisible"
                      onClick={() => {
                        this.sendMessage();
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const PatientRow = ({
  patient: { id, name, phone, when, toRespond, seen, active },
  loadMessages,
}) => (
  <li
    className="list-group-item d-flex justify-content-between p-2 border border-light"
    style={{ backgroundColor: "#E9E9E9", cursor: "pointer" }}
    onClick={() => {
      loadMessages(id);
    }}
  >
    <div style={{ fontSize: "0.95rem" }}>
      <strong>{name}</strong>
      <p className="text-muted mb-0">{phone}</p>
    </div>
    <div>
      <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
        {when}
      </p>
      {seen ? (
        <span className="text-muted float-right">
          <FaCheck aria-hidden="true" />
        </span>
      ) : toRespond ? (
        <span className="badge badge-danger float-right">{toRespond}</span>
      ) : (
        <span className="text-muted float-right">
          <FaReply aria-hidden="true" />
        </span>
      )}
    </div>
  </li>
);

const ChatMessage = ({
  message: { id, person, messageDate, messageText, receiver },
  getHora,
}) => (
  <div className={`card mb-2 ${receiver ? "cardMessageReceiver" : "cardMessage"}`}>
    <div className="card-body py-2 px-3">
      <div>
        <strong className="primary-font">{person.name}</strong>
        <small className="pull-right text-muted float-right">
          <FaClock /> {getHora(messageDate)}
        </small>
      </div>
      <hr className="my-1" />
      <p className="mb-0">{messageText}</p>
    </div>
  </div>
);

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { patientsDoctor } = state.patientsDoctor;
  const { message } = state.message;
  const { messages } = state.messages;
  return {
    user,
    patientsDoctor,
    message,
    messages,
  };
}

export default connect(mapStateToProps)(ChatPage);
