export const createCustomEventDispatcher = (eventId, detailPropName) => payload => {
  const customEvent = new CustomEvent(eventId, {
    detail: {
      [detailPropName]: payload,
    },
  });
  window.dispatchEvent(customEvent);
};

export const listenToCustomEvents = (customEventArray, customEventHandler) => {
  customEventArray.forEach(eventType => window.addEventListener(eventType, customEventHandler));

  return () => {
    customEventArray.forEach(eventType =>
      window.removeEventListener(eventType, customEventHandler)
    );
  };
};
