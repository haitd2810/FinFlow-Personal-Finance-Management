package vn.finflow.api.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class APIResponse<T> {
    private String message;
    private int code;
    private T data;
    private Object errors;
    private int status;

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    public static <T> APIResponse<T> success(int status, T data, String message){
        return APIResponse.<T>builder()
                .status(status)
                .message(message)
                .data(data)
                .build();
    }

    public static <T> APIResponse<T> error(int status,String message, Object errors, int code){
        return APIResponse.<T>builder()
                .status(status)
                .message(message)
                .errors(errors)
                .code(code)
                .build();
    }
}
