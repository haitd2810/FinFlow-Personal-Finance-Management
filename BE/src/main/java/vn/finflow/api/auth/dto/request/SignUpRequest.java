package vn.finflow.api.auth.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignUpRequest {
    @NotBlank
    @Email(message = "Email is not valid")
    private String email;

    @NotBlank
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank
    @Pattern(
            regexp = "^(?:\\+84|0)(3|5|7|8|9)[0-9]{8}$",
            message = "Invalid Vietnamese phone number"
    )
    private String phoneNumber;

    @NotBlank
    private String accountName;
}
