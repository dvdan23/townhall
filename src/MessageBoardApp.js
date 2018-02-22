class MessageBoardApp {
  constructor(props) {
    this.view = props.view;
    this.localStorage = props.localStorage;
    this.menloStorage = props.menloStorage;
    this.contract = props.contract;

    this.view.setState({
      onCreateMessage: this.createMessage.bind(this)
    });
  }

  viewMessages() {
    this.view.setState({
      messages: this.menloStorage.messages
    });
  }

  createMessage(messageBody) {
    let message = {
      version: "CONTRACT_VERSION",
      parent: "0",
      body: messageBody
    }

    this.localStorage.createMessage(message).then((localMessage) => {
      this.contract.createMessage(message);
      this.menloStorage.createMessage(message);

      this.viewMessages();
    });
  }
}

export default MessageBoardApp;
