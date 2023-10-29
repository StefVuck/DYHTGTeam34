let user = null;

export function setCustomerId(inputUser) {
    user = inputUser;
}

export function getCustomer() {
    return user;
}

export function getLoyaltyLevel() {
    return user?(user.LoyaltyLevel):(0);
}