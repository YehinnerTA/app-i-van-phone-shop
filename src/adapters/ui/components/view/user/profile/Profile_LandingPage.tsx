import React from "react";
import './Profile_LandingPage.css';
import { useProfile, formatDateOnly } from "../../../../hook/users/useProfile";

const Profile_LandingPage: React.FC = () => {
    const {
        userData,
        passwordData,
        isLoading,
        showPasswordModal,
        showPasswords,
        generateInitials,
        handleInputChange,
        handlePasswordChange,
        saveProfile,
        changePassword,
        handlePasswordSubmit,
        togglePasswordVisibility,
        confirmLogout,
        goBack,
        getSaveButtonText,
        closePasswordModal,
        passwordErrors,
    } = useProfile();

    return (
        <div className="profile-container">
            <div className="header-profile">
                <button className="back-btn-profile" onClick={goBack}>←</button>
                <h1 className="header-text-profile">Mi Perfil</h1>
            </div>

            <div className="profile-section">
                <div className="profile-avatar" id="avatar">
                    {generateInitials(userData.name)}
                </div>
                <div className="profile-name" id="profileName">{userData.name}</div>
                <div className="profile-email" id="profileEmail">{userData.email}</div>
                <span className="profile-status">{userData.role}</span>

                <div className="stats-grid-profile">
                    <div className="stat-card-profile">
                        <span className="stat-number-profile">12</span>
                        <span className="stat-label-profile">Pedidos</span>
                    </div>
                    <div className="stat-card-profile">
                        <span className="stat-number-profile">5</span>
                        <span className="stat-label-profile">Favoritos</span>
                    </div>
                </div>
            </div>

            <div className="form-section-profile">
                <h2 className="section-title-profile">
                    <span className="section-icon-profile">👤</span>
                    Información Personal
                </h2>

                <div className="form-group-profile">
                    <label className="form-label-profile">Nombre Completo</label>
                    <input
                        type="text"
                        className="form-input-profile"
                        id="name"
                        value={userData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                </div>

                <div className="form-group-profile">
                    <label className="form-label-profile">Email</label>
                    <input
                        type="email"
                        className="form-input-profile"
                        id="email"
                        value={userData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                </div>

                <div className="form-row-profile">
                    <div className="form-group-profile">
                        <label className="form-label-profile">Teléfono</label>
                        <input
                            type="tel"
                            className="form-input-profile"
                            id="phone"
                            value={userData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                    </div>
                    <div className="form-group-profile">
                        <label className="form-label-profile">DNI</label>
                        <input
                            type="text"
                            className="form-input-profile"
                            id="dni"
                            value={userData.dni}
                            onChange={(e) => handleInputChange('dni', e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group-profile">
                    <label className="form-label-profile">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        className="form-input-profile"
                        id="birthDate"
                        value={userData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    />
                </div>
            </div>

            <div className="form-section-profile">
                <h2 className="section-title-profile">
                    <span className="section-icon-profile">📍</span>
                    Dirección de Envío
                </h2>

                <div className="form-group-profile">
                    <label className="form-label-profile">Dirección</label>
                    <input
                        type="text"
                        className="form-input-profile"
                        id="address"
                        value={userData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                </div>

                <div className="form-row-profile">
                    <div className="form-group-profile">
                        <label className="form-label-profile">Distrito</label>
                        <input
                            type="text"
                            className="form-input-profile"
                            id="district"
                            value={userData.district}
                            onChange={(e) => handleInputChange('district', e.target.value)}
                        />
                    </div>
                    <div className="form-group-profile">
                        <label className="form-label-profile">Código Postal</label>
                        <input
                            type="text"
                            className="form-input-profile"
                            id="zipCode"
                            value={userData.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group-profile">
                    <label className="form-label-profile">Ciudad</label>
                    <input
                        type="text"
                        className="form-input-profile"
                        id="city"
                        value={userData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                </div>
            </div>

            <div className="form-section-profile">
                <h2 className="section-title-profile">
                    <span className="section-icon-profile">⚙️</span>
                    Configuración de Cuenta
                </h2>

                <div className="form-group-profile">
                    <label className="form-label-profile">Tipo de Usuario</label>
                    <input type="text" className="form-input-profile" value="Premium" disabled />
                </div>

                <div className="form-row-profile">
                    <div className="form-group-profile">
                        <label className="form-label-profile">Fecha de Registro</label>
                        <input
                            type="text"
                            className="form-input-profile"
                            value={formatDateOnly(userData.createAt)}
                            disabled
                        />
                    </div>
                    <div className="form-group-profile">
                        <label className="form-label-profile">Último Acceso</label>
                        <input
                            type="text"
                            className="form-input-profile"
                            value={
                                userData.lastAccess
                                    ? new Date(userData.lastAccess).toLocaleString("es-PE", {
                                        weekday: "short",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })
                                    : ""
                            }
                            disabled
                        />
                    </div>
                </div>
            </div>

            <div className="action-buttons-profile">
                <button
                    className="btn-profile btn-primary-profile"
                    onClick={saveProfile}
                    disabled={isLoading}
                >
                    {getSaveButtonText()}
                </button>
                <button className="btn-profile btn-secondary-profile" onClick={changePassword}>
                    Cambiar Contraseña
                </button>
                <button className="btn-profile btn-danger-profile" onClick={confirmLogout}>
                    Cerrar Sesión
                </button>
            </div>

            {/* Modal para cambiar contraseña */}
            {showPasswordModal && (
                <div className="modal-overlay-profile" onClick={closePasswordModal}>
                    <div className="modal-content-profile" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header-profile">
                            <h3 className="modal-title-profile">
                                <span className="modal-icon-profile">🔐</span>
                                Cambiar Contraseña
                            </h3>
                            <button className="modal-close-btn-profile" onClick={closePasswordModal}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={handlePasswordSubmit} className="modal-form-profile">
                            <div className="form-group-profile">
                                <label className="form-label-profile">Contraseña Actual</label>
                                <div className="password-input-container-profile">
                                    <input
                                        type={showPasswords.current ? "text" : "password"}
                                        className="form-input-profile password-input-profile"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                                        placeholder="Ingresa tu contraseña actual"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn-profile"
                                        onClick={() => togglePasswordVisibility('current')}
                                    >
                                        {showPasswords.current ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group-profile">
                                <label className="form-label-profile">Nueva Contraseña</label>
                                <div className="password-input-container-profile">
                                    <input
                                        type={showPasswords.new ? "text" : "password"}
                                        className="form-input-profile password-input-profile"
                                        value={passwordData.newPassword}
                                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                                        placeholder="Ingresa tu nueva contraseña"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn-profile"
                                        onClick={() => togglePasswordVisibility('new')}
                                    >
                                        {showPasswords.new ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group-profile">
                                <label className="form-label-profile">Confirmar Nueva Contraseña</label>
                                <div className="password-input-container-profile">
                                    <input
                                        type={showPasswords.confirm ? "text" : "password"}
                                        className="form-input-profile password-input-profile"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                                        placeholder="Confirma tu nueva contraseña"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle-btn-profile"
                                        onClick={() => togglePasswordVisibility('confirm')}
                                    >
                                        {showPasswords.confirm ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                            </div>

                            {passwordErrors.length > 0 && (
                                <div className="password-errors-profile">
                                    <h4 className="error-title-profile">⚠️ Requisitos de contraseña:</h4>
                                    <ul className="error-list-profile">
                                        {passwordErrors.map((error, index) => (
                                            <li key={index} className="error-item-profile">{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="modal-actions-profile">
                                <button
                                    type="submit"
                                    className="btn-profile btn-primary-profile"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile_LandingPage;