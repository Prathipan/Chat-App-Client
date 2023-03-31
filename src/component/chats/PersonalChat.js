import { Avatar, Tooltip } from "@chakra-ui/react";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../../codeLogics/ChatLogic";
import { ChatState } from "../../context/chatProvider";

const FeedChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((msg, ind) => {
          return (
            <div style={{ display: "flex" }} key={msg._id}>
              {isSameSender(messages, msg, ind, user._id) ||
                (isLastMessage(messages, ind, user._id) && (
                  <Tooltip
                    label={msg.sender.userName}
                    placement="bottom-start"
                    hasArrow
                  >
                    <Avatar
                      mt="7px"
                      mr={1}
                      size="sm"
                      cursor="pointer"
                      name={msg.sender.userName}
                      src={msg.sender.picture}
                    />
                  </Tooltip>
                ))}
              <span
                style={{
                  backgroundColor: `${
                    msg.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  borderRadius : "20px",
                  padding : "5px 15px",
                  maxWidth : "75%",
                  marginLeft : isSameSenderMargin(messages,msg,ind,user._id),
                  marginTop : isSameUser(messages,msg,ind,user._id) ? 3 : 10,
                }}
              >{msg.content}</span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default FeedChat;
