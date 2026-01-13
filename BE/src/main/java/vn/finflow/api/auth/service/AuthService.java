package vn.finflow.api.auth.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.finflow.api.auth.dto.request.LoginRequest;
import vn.finflow.api.auth.dto.request.SignUpRequest;
import vn.finflow.api.auth.dto.response.LoginResponse;
import vn.finflow.api.auth.dto.response.UserResponseDTO;
import vn.finflow.api.auth.repository.AuthRepository;
import vn.finflow.api.common.entity.Users;
import vn.finflow.api.common.exception.DataNotFoundException;
import vn.finflow.api.common.exception.UnauthorizedException;
import vn.finflow.api.common.exception.DuplicateDataException;
import vn.finflow.api.common.message.ErrorMessage;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public UserResponseDTO register(SignUpRequest request){
        if(authRepository.existsByEmail(request.getEmail())){
            throw new DuplicateDataException(ErrorMessage.EMAIL_ALREADY_EXISTS);
        }

        if(authRepository.existsByPhoneNumber(request.getPhoneNumber())){
            throw new DuplicateDataException(ErrorMessage.PHONE_ALREADY_EXISTS);
        }

        String passwordEncoded = passwordEncoder.encode(request.getPassword());
        Users user = new Users();
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAccountName(request.getAccountName());
        user.setPassword(passwordEncoded);
        user.setDeleteFlag(true);

        Users savedUser = authRepository.saveAndFlush(user);

        UserResponseDTO result = new UserResponseDTO();

        result.setId(savedUser.getId());
        result.setEmail(savedUser.getEmail());
        result.setAccountName(savedUser.getAccountName());
        result.setPhoneNumber(savedUser.getPhoneNumber());
        result.setCreatedAt(savedUser.getCreatedAt());

        return result;
    }

    public LoginResponse authenticate(LoginRequest request){
        var user = authRepository.findByEmailAndDeleteFlagFalse(request.getEmail())
                .orElseThrow(() -> new DataNotFoundException(ErrorMessage.USER_NOT_EXISTED));

        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if(!authenticated){
            throw new UnauthorizedException(ErrorMessage.INVALID_CREDENTIALS);
        }

        var token = jwtService.generateAccessToken(user);

        return LoginResponse.builder()
                .accessToken(token)
                .build();
    }
}
