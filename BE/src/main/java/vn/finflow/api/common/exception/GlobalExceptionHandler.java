package vn.finflow.api.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import vn.finflow.api.common.dto.APIResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(DuplicateDataException.class)
    public ResponseEntity<APIResponse<Object>> handleDuplicateData(DuplicateDataException ex){
        return ResponseEntity.
                status(HttpStatus.CONFLICT)
                .body(
                        APIResponse.error(
                                HttpStatus.CONFLICT.value(),
                                ex.getMessage(),
                                null
                        )
                );
    }
}
