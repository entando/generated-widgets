export const createWidgetEventDispatcher = (eventId, detailPropName) => payload => {
  const widgetEvent = new CustomEvent(eventId, {
    detail: {
      [detailPropName]: payload,
    },
  });
  window.dispatchEvent(widgetEvent);
};

export const listenToWidgetEvents = (widgetEventArray, eventHandler) => {
  widgetEventArray.forEach(eventType => window.addEventListener(eventType, eventHandler));

  return () => {
    widgetEventArray.forEach(eventType => window.removeEventListener(eventType, eventHandler));
  };
};
