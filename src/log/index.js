module.exports = {
  start: () => console.log(`Server is starting...`),

  homeworkSaved: (share_point_id) => console.log(`Homework saved! Share Point ID: ${share_point_id}`),

  answerSaved: (id) => console.log(`Answer saved with ID: ${id}`),

  permissionDanied: () => console.log("Permission danied to send message!"),
};
