package CristinaUzunov.GameLog.security;

import CristinaUzunov.GameLog.entities.Utente;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTools {

    @Value("${jwt.secret}")
    private String secret;

    // genera il token a partire dall'utente
    public String generaToken(Utente utente) {
        SecretKey chiave = Keys.hmacShaKeyFor(secret.getBytes());
        Date adesso = new Date();
        Date scadenza = new Date(adesso.getTime() + 1000 * 60 * 60 * 24); // 24 ore

        return Jwts.builder()
                .issuedAt(adesso)
                .expiration(scadenza)
                .subject(String.valueOf(utente.getId()))
                .signWith(chiave)
                .compact();
    }

    // controlla che il token sia valido (se non lo e, lancia un'eccezione)
    public void verificaToken(String token) {
        SecretKey chiave = Keys.hmacShaKeyFor(secret.getBytes());
        Jwts.parser()
                .verifyWith(chiave)
                .build()
                .parseSignedClaims(token);
    }

    // estrae l'id dell'utente contenuto nel token
    public Long getIdFromToken(String token) {
        SecretKey chiave = Keys.hmacShaKeyFor(secret.getBytes());
        String id = Jwts.parser()
                .verifyWith(chiave)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
        return Long.parseLong(id);
    }
}