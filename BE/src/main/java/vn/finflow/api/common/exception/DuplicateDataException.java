package vn.finflow.api.common.exception;

import lombok.Getter;
import vn.finflow.api.common.message.ErrorMessage;

@Getter
public class DuplicateDataException extends RuntimeException {
    private int code;
    public DuplicateDataException(ErrorMessage errorMessage){
        super(errorMessage.getMessage());
        this.code = errorMessage.getCode();
    }
}
