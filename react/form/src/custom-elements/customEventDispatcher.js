export default (eventId, detailPropName) => payload => {
  const customEvent = new CustomEvent(eventId, {
    detail: {
      [detailPropName]: payload,
    },
  });
  this.dispatchEvent(customEvent);
};
