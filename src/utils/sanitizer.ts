class Sanitizer {
  static sanitize(payload: any) {
    const transformedObject: any = {};
    Object.keys(payload).forEach((key) => {
      if (payload[key] && typeof payload[key] === 'string') {
        transformedObject[key] = payload[key].trim();
      } else {
        transformedObject[key] = payload[key];
      }
    });
    return transformedObject;
  }
}

export default Sanitizer;
