export const getSender = (loggedUser, users) => {
  console.log("getSender: ",loggedUser,users);
  return users[0]._id === loggedUser._id
    ? users[1].userName
    : users[0].userName;
};

export const getFullSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, msg, ind, userId) => {
  return (
    ind < messages.length - 1 &&
    (messages[ind + 1].sender._id !== msg.sender._id ||
      messages[ind + 1].sender._id === undefined) &&
    messages[ind].sender._id !== userId
  );
};

export const isLastMessage = (messages, ind, userId) => {
  return (
    ind === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, msg, ind, userId) => {
  // console.log(i === messages.length - 1);

  if (
    ind < messages.length - 1 &&
    messages[ind + 1].sender._id === msg.sender._id &&
    messages[ind].sender._id !== userId
  )
    return 33;
  else if (
    (ind < messages.length - 1 &&
      messages[ind + 1].sender._id !== msg.sender._id &&
      messages[ind].sender._id !== userId) ||
    (ind === messages.length - 1 && messages[ind].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, msg, ind) => {
  return ind > 0 && messages[ind - 1].sender._id === msg.sender._id;
};
