import React, { useState } from 'react';
import { colors } from '@/config/colors';

export default function BookForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    intent: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar submissão do formulário
    console.log('Formulário enviado:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-lg" style={{ backgroundColor: colors.card }}>
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: colors.foreground }}>
          Nome
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border transition-colors"
          style={{
            backgroundColor: colors.background,
            borderColor: colors.border,
            color: colors.foreground,
          }}
          placeholder="Seu nome"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: colors.foreground }}>
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg border transition-colors"
          style={{
            backgroundColor: colors.background,
            borderColor: colors.border,
            color: colors.foreground,
          }}
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: colors.foreground }}>
          Telefone
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border transition-colors"
          style={{
            backgroundColor: colors.background,
            borderColor: colors.border,
            color: colors.foreground,
          }}
          placeholder="+351 ..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: colors.foreground }}>
          Data Preferida
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border transition-colors"
          style={{
            backgroundColor: colors.background,
            borderColor: colors.border,
            color: colors.foreground,
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: colors.foreground }}>
          Interesse
        </label>
        <select
          name="intent"
          value={formData.intent}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border transition-colors"
          style={{
            backgroundColor: colors.background,
            borderColor: colors.border,
            color: colors.foreground,
          }}
        >
          <option value="">Selecionar...</option>
          <option value="hot-desk">Hot Desk</option>
          <option value="private-office">Escritório Privado</option>
          <option value="meeting-room">Sala de Reunião</option>
          <option value="other">Outro</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: colors.foreground }}>
          Mensagem
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border transition-colors"
          style={{
            backgroundColor: colors.background,
            borderColor: colors.border,
            color: colors.foreground,
          }}
          placeholder="Conte-nos mais sobre você..."
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
        style={{ backgroundColor: colors.primary, color: colors['primary-foreground'] }}
      >
        Enviar Pedido
      </button>

      {submitted && (
        <div className="p-4 rounded-lg text-center" style={{ backgroundColor: colors.background, color: colors.primary }}>
          ✓ Obrigado! Entraremos em contacto em breve.
        </div>
      )}
    </form>
  );
}
