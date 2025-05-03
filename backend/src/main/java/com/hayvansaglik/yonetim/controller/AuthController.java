package com.hayvansaglik.yonetim.controller;

import com.hayvansaglik.yonetim.model.Role;
import com.hayvansaglik.yonetim.model.Role.ERole;
import com.hayvansaglik.yonetim.model.User;
import com.hayvansaglik.yonetim.payload.request.LoginRequest;
import com.hayvansaglik.yonetim.payload.request.SignupRequest;
import com.hayvansaglik.yonetim.payload.response.JwtResponse;
import com.hayvansaglik.yonetim.payload.response.MessageResponse;
import com.hayvansaglik.yonetim.repository.RoleRepository;
import com.hayvansaglik.yonetim.repository.UserRepository;
import com.hayvansaglik.yonetim.security.JwtTokenProvider;
import com.hayvansaglik.yonetim.security.UserPrincipal;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        
        UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles
        ));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        // Check if username already exists
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        // Check if email already exists
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                passwordEncoder.encode(signUpRequest.getPassword())
        );

        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setPhone(signUpRequest.getPhone());

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null || strRoles.isEmpty()) {
            Role userRole = roleRepository.findByName(ERole.ROLE_SAHIP)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "veteriner":
                        Role vetRole = roleRepository.findByName(ERole.ROLE_VETERINER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(vetRole);
                        break;
                    case "laborant":
                        Role labRole = roleRepository.findByName(ERole.ROLE_LABORANT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(labRole);
                        break;
                    case "hemsire":
                        Role nurseRole = roleRepository.findByName(ERole.ROLE_HEMSIRE)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(nurseRole);
                        break;
                    case "muhasebe":
                        Role accountantRole = roleRepository.findByName(ERole.ROLE_MUHASEBE)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(accountantRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_SAHIP)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
} 