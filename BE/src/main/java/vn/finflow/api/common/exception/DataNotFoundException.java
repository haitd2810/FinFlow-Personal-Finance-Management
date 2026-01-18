package vn.finflow.api.common.exception;

import lombok.Getter;
import vn.finflow.api.common.message.ErrorMessage;

@Getter
public class DataNotFoundException extends RuntimeException {
    private final int code;
    public DataNotFoundException(ErrorMessage errorMessage) {
        super(errorMessage.getMessage());
        this.code = errorMessage.getCode();
    }
}
