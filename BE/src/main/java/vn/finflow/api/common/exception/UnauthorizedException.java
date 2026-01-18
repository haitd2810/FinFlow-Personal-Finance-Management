package vn.finflow.api.common.exception;

import lombok.Getter;
import vn.finflow.api.common.message.ErrorMessage;

@Getter
public class UnauthorizedException extends RuntimeException {
    private int code;
    public UnauthorizedException(ErrorMessage errorMessage){
        super(errorMessage.getMessage());
        this.code = errorMessage.getCode();
    }
}
