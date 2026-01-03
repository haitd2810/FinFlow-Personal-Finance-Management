package vn.finflow.api.auth.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.finflow.api.auth.dto.request.SignUpRequest;
import vn.finflow.api.auth.dto.response.UserResponseDTO;
import vn.finflow.api.auth.repository.AuthRepository;
import vn.finflow.api.common.entity.Users;
import vn.finflow.api.common.exception.DuplicateDataException;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponseDTO register(SignUpRequest request){
        if(authRepository.existsByEmail(request.getEmail())){
            throw new DuplicateDataException("Email is in used");
        }

        if(authRepository.existsByPhoneNumber(request.getPhoneNumber())){
            throw new DuplicateDataException("Phone number is in used");
        }
        System.out.println(request);

        Users user = new Users();
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAccountName(request.getAccountName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setDeleteFlag(false);

        Users savedUser = authRepository.save(user);

        UserResponseDTO result = new UserResponseDTO();

        result.setId(savedUser.getId());
        result.setEmail(savedUser.getEmail());
        result.setAccountName(savedUser.getAccountName());
        result.setPhoneNumber(savedUser.getPhoneNumber());
        result.setCreatedAt(savedUser.getCreatedAt());

        return result;
    }
}
