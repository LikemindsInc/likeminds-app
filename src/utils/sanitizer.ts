class Sanitizer {
  static sanitize(payload: any) {
    const transformedObject: any = {};
    Object.keys(payload).forEach((key) => {
      transformedObject[key] = payload[key].trim();
    });
    return transformedObject;
  }
}

export default Sanitizer;
