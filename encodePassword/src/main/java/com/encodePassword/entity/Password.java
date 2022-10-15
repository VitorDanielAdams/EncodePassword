package com.encodePassword.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "passwords")
public class Password {

    @Id
    @Getter @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter @Setter
    @Column(name = "password", nullable = false)
    private String password;

    @Getter @Setter
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Getter @Setter
    @Column(name = "url", nullable = false)
    private String url;

}
