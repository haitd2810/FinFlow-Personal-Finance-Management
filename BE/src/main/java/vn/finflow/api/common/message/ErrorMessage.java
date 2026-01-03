package vn.finflow.api.common.message;

public final class ErrorMessage {
    private ErrorMessage() {}

    public static final String VALIDATION_ERROR = "Validation failed";
    public static final String EMAIL_ALREADY_EXISTS = "Email already exists";
    public static final String PHONE_ALREADY_EXISTS = "Phone already exists";
}
