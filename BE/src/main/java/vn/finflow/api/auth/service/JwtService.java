package vn.finflow.api.auth.service;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.experimental.NonFinal;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import vn.finflow.api.common.entity.Users;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class JwtService {
    @NonFinal
    protected static final String SECRET_KEY = "PRIVATE_KEY_FINFLOW";
    @NonFinal
    protected  static final String SIGNED_KEY = "67b0829922553c94be8ef78b118a7b62c299935d4d73d8de2b207ba37f11593c";

    public String generateAccessToken(Users user){
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .issuer("finflow.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                ))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(jwsHeader, payload);

        try{
            jwsObject.sign(new MACSigner(SIGNED_KEY.getBytes()));
            return jwsObject.serialize();
        }catch(Exception ex){
            throw new RuntimeException(ex);
        }
    }
}
