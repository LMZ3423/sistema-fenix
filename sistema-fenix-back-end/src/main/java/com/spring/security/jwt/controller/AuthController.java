package com.spring.security.jwt.controller;

import com.spring.security.jwt.dto.AuthRequestDto;
import com.spring.security.jwt.dto.AuthResponseDto;
import com.spring.security.jwt.model.UserModel;
import com.spring.security.jwt.repository.UserRepository;
import com.spring.security.jwt.service.JwtUtilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api/v1/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtilService jwtUtilService;
    
    @Autowired
    private UserRepository UserRep;

    @PostMapping("/login")
    public ResponseEntity<?> auth(@RequestBody AuthRequestDto authRequestDto) {

        try {
            //1. Gestion authenticationManager
            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authRequestDto.getUser(), authRequestDto.getPassword()
            ));

            //2. Validar el usuario en la bd
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(authRequestDto.getUser());
            UserModel user = this.UserRep.findByName(authRequestDto.getUser());
            System.out.println("userDetails userDetails userDetails::: " + userDetails);
            //3. Generar token
            String jwt = this.jwtUtilService.generateToken(userDetails);

            AuthResponseDto authResponseDto = new AuthResponseDto();
            authResponseDto.setUserId(user.getUserId());
            authResponseDto.setRoleId(user.getRoleId());
            authResponseDto.setToken(jwt);

            return new ResponseEntity<AuthResponseDto>(authResponseDto, HttpStatus.OK);

        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error Authetication:::" + e.getMessage());
        }

    }
}
