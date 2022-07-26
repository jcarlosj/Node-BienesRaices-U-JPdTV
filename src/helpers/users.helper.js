const isOwner = ( userId, ownerUserId ) => {
    return userId === ownerUserId;
}


export {
    isOwner
}