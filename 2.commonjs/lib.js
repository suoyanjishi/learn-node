module.exports = function(playerAction) {
    let random = Math.random() * 3;
    let computerAction;
    
    if (random < 1) {
      computerAction = "rock";
    } else if (random > 2) {
      computerAction = "scissor";
    } else {
      computerAction = "pager";
    }
    console.log('我出了' + computerAction);

    if (computerAction === playerAction) {
      console.log("平局");
      return 0;
    } else if (
      (computerAction === "rock" && playerAction === "paper") ||
      (computerAction === "scissor" && playerAction === "rock") ||
      (computerAction === "paper" && playerAction === "scissor")
    ) {
      console.log("你赢了");
      return -1;
    } else {
      console.log("你输了");
      return 1;
    }    
}

