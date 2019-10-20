export const publishWidgetEvent = (eventId, payload) => {
  const widgetEvent = new CustomEvent(eventId, {
    detail: {
      payload,
    },
  });
  window.dispatchEvent(widgetEvent);
};

export const subscribeToWidgetEvents = (widgetEvents, eventHandler) => {
  widgetEvents.forEach(eventType => window.addEventListener(eventType, eventHandler));

  return () => {
    widgetEvents.forEach(eventType => window.removeEventListener(eventType, eventHandler));
  };
};
