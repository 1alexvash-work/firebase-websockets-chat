  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "messages"), orderBy("date"), limit(100)),
      (snapshot) => {
        const fetchedMessages = [] as Message[];

        snapshot.forEach((document) => {
          const message: Message = {
            id: document.id,
            user: document.data().user,
            message: document.data().message,
            date: document.data().date,
          };

          fetchedMessages.push(message);
        });

        setMessages(fetchedMessages);
      }
    );

    return () => unsubscribe();
  }, []);
