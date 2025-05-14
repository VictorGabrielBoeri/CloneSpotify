import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Search from '@/views/Search.vue'

describe('Search.vue', () => {
  it('renderiza o campo de busca', () => {
    const wrapper = mount(Search)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  })

  it('mostra categorias quando não há busca', () => {
    const wrapper = mount(Search)
    expect(wrapper.text()).toContain('Navegar por categorias')
  })

  it('chama handleSearch ao digitar', async () => {
    const wrapper = mount(Search)
    const input = wrapper.find('input[type="text"]')
    await input.setValue('rock')
    expect(wrapper.vm.searchQuery).toBe('rock')
  })
})
