import { createContext, useState, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import Gun from "gun";

export const DiscordContext = createContext();

const gun = Gun(["https://discord-gunjs-node.herokuapp.com/gun"]);

const initialState = { messages: [] }

const reducer = (state, action) => {
  try {
    if (action.type === "clear") return { messages: [] };
    if (action.type === "add")
      return { messages: [...state.messages, action.data] };
  } catch (err) {
    console.error(err);
  }
};

export const DiscordProvider = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentAccount, setCurrentAccount] = useState("");
  const [roomName, setRoomName] = useState("");
  const [placeHolder, setPlaceHolder] = useState("Message...");
  const [messageText, setMessageText] = useState("");
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    setCurrentAcc()
  }, [currentAccount])

  useEffect(() => {
    setRoomName(router.query.name)
    dispatch({ type:'clear', data: {} })
    setPlaceHolder(`Message ${router.query.name}`)
    setMessageText('')
    getMessages()
  }, [router.query])
  
  const getMessages = () => {
    const _name = router.query.name
    const _roomId = router.query.id
    const messageRef = gun.get(_name)

    messageRef.map().one(message => {
      dispatch({
        type: "add",
        data: {
          sender: message.sender,
          content: message.content,
          avatar: message.avatar,
          createdAt: message.createdAt,
          messageId: message.messageId,
        }
      })
    })
  }

  const setCurrentAcc = async () => {
    if (!currentAccount) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCurrentUserData?account=${currentAccount}`)
      const data = await response.json()
      setCurrentUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  const createUserAccount = async (userAddress = currentAccount) => {
    if (!window.ethereum) return;

    try {
      const data = { userAddress };

      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.error(error);
      }

      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createDm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return;
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
        createUserAccount(addressArray[0]);
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return;
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
        createUserAccount(addressArray[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DiscordContext.Provider
      value={{
        currentAccount,
        roomName,
        setRoomName,
        placeHolder,
        messageText,
        setMessageText,
        state,
        gun,
        connectWallet,
        currentUser,
      }}
    >
      {children}
    </DiscordContext.Provider>
  );
};
