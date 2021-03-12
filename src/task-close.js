export default function textColorCompleteAndClassClose(e) {
   let target = e.target;
   target.checked ?
      target.setAttribute("checked", "") :
      target.removeAttribute("checked");

   if (e.target.className == "close") {
      e.target.parentNode.remove();
   }
};