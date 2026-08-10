package CristinaUzunov.GameLog.security;

import CristinaUzunov.GameLog.entities.Utente;
import CristinaUzunov.GameLog.services.UtenteService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class TokenFilter extends OncePerRequestFilter {

    private final JwtTools jwtTools;
    private final UtenteService utenteService;

    public TokenFilter(JwtTools jwtTools, UtenteService utenteService) {
        this.jwtTools = jwtTools;
        this.utenteService = utenteService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authorization = request.getHeader("Authorization");

        // se non c'e l'header o non inizia con Bearer, passo avanti senza autenticare
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // tolgo la parola Bearer e tengo solo il token
        String token = authorization.substring(7);

        // controllo che il token sia valido
        jwtTools.verificaToken(token);

        // recupero l'id dal token e carico l'utente dal database
        Long idUtente = jwtTools.getIdFromToken(token);
        Utente utente = utenteService.findById(idUtente);

        // preparo il ruolo dell'utente per Spring Security
        List<SimpleGrantedAuthority> ruoli = new ArrayList<>();
        ruoli.add(new SimpleGrantedAuthority("ROLE_" + utente.getRuolo().name()));

        // dico a Spring Security chi e l'utente autenticato
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(utente, null, ruoli);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // proseguo con la richiesta
        filterChain.doFilter(request, response);
    }
}