function ConvertToAmPm(hours) {
  const ampm = hours >= 12 ? "pm" : "am";
  hours %= 12;
  hours = hours || 12;
  return `${hours+" "+ampm}`
}
export default ConvertToAmPm;
