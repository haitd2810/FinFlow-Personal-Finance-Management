package vn.finflow.api.common.exception;

import java.security.InvalidKeyException;

public class DuplicateDataException extends RuntimeException {
    public DuplicateDataException(String message){
        super(message);
    }
}
