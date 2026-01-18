package vn.finflow.api.common.message;

import lombok.Getter;

@Getter
public enum ErrorMessage {

    VALIDATION_ERROR(9999,"Validation failed"),
    EMAIL_ALREADY_EXISTS(101,"Email already exists"),
    PHONE_ALREADY_EXISTS(102,"Phone already exists"),
    USER_NOT_EXISTED(103,"User is not existed"),
    INVALID_CREDENTIALS(104, "Unauthenticated");

    int code;
    String message;
    ErrorMessage(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
