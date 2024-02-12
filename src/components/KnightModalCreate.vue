<template>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal">
        <button class="close-button" @click="$emit('close')">Fechar Modal</button>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <style>
  /* Estilos do modal aqui */
  </style>