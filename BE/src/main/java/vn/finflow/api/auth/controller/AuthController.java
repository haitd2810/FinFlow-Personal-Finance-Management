package vn.finflow.api.auth.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import vn.finflow.api.auth.dto.request.LoginRequest;
import vn.finflow.api.auth.dto.request.SignUpRequest;
import vn.finflow.api.auth.dto.response.LoginResponse;
import vn.finflow.api.auth.dto.response.UserResponseDTO;
import vn.finflow.api.auth.service.AuthService;
import vn.finflow.api.common.dto.APIResponse;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    @PostMapping("/signup")
    public ResponseEntity<APIResponse<UserResponseDTO>> register(@Valid @RequestBody SignUpRequest request){
        UserResponseDTO response = authService.register(request);
        return ResponseEntity.ok(
                APIResponse.success(201, response, "Signup successfully!")
        );
    }

    @PostMapping("/login")
    public ResponseEntity<APIResponse<LoginResponse>> login (@Valid @RequestBody LoginRequest request){
        var response = authService.authenticate(request);
        return ResponseEntity.ok(
                APIResponse.success(200, response, "Login successfully")
        );
    }
}
