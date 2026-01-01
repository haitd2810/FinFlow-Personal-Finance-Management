package vn.finflow.api.common.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "jars")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Jars {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, updatable = false, unique = true)
    private String id;

    @Column(name = "user_id", nullable = false, length = 36)
    private String userId;

    @Column(name = "jar_name", nullable = false, length = 100)
    private String jarName;

    @Column(name = "percentage", nullable = false)
    private BigDecimal percentage;

    @Column(name = "balance")
    private BigDecimal balance;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "color_code", length = 10, nullable = false)
    private String colorCode;

    @Column(name = "icon_url", length = 2048, nullable = false)
    private String iconUrl;

    @Column(name = "priority_order")
    private int priorityOrder;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "delete_flag")
    private boolean deleteFlag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, insertable = false, updatable = false)
    private Users user;
}
