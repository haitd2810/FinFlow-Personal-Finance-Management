package vn.finflow.api.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import vn.finflow.api.common.dto.APIResponse;

import java.util.ArrayList;
import java.util.List;

import static vn.finflow.api.common.message.ErrorMessage.VALIDATION_ERROR;

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
                                null,
                                ex.getCode()
                        )
                );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<APIResponse<Object>> handleInvalidArgument(MethodArgumentNotValidException ex){
        List<String> errors = new ArrayList<String>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.add(error.getDefaultMessage())
                );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        APIResponse.error(
                                HttpStatus.BAD_REQUEST.value(),
                                VALIDATION_ERROR.getMessage(),
                                errors,
                                VALIDATION_ERROR.getCode()
                        )
                );
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<APIResponse<Object>> handleUnauthorized(UnauthorizedException ex){
        return ResponseEntity.
                status(HttpStatus.UNAUTHORIZED)
                .body(
                        APIResponse.error(
                                HttpStatus.UNAUTHORIZED.value(),
                                ex.getMessage(),
                                null,
                                ex.getCode()
                        )
                );
    }

    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<APIResponse<Object>> handleDataNotFound(DataNotFoundException ex){
        return ResponseEntity.
                status(HttpStatus.NOT_FOUND)
                .body(
                        APIResponse.error(
                                HttpStatus.NOT_FOUND.value(),
                                ex.getMessage(),
                                null,
                                ex.getCode()
                        )
                );
    }
}
