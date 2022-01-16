module.exports = {
  start: () => console.log(`Server is starting...`),

  homeworkSaved: (id) => console.log(`Homework saved with ID: ${id}`),

  answerSaved: (id) => console.log(`Answer saved with ID: ${id}`),

  permissionDanied: () => console.log("Permission danied to send message!"),
};
