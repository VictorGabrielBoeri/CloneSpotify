import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Player from '@/components/Player.vue'
import { createTestingPinia } from '@pinia/testing'

describe('Player.vue', () => {
  it('renders player controls', () => {
    const wrapper = mount(Player, {
      global: {
        plugins: [createTestingPinia()]
      }
    })

    expect(wrapper.find('.bg-spotify-gray').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('toggles play/pause when button is clicked', async () => {
    const wrapper = mount(Player, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    const playButton = wrapper.find('button')
    await playButton.trigger('click')

    expect(wrapper.vm.isPlaying).toBe(true)
  })

  it('updates volume when slider is clicked', async () => {
    const wrapper = mount(Player, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })

    const volumeSlider = wrapper.find('.w-24')
    await volumeSlider.trigger('click', {
      clientX: 100
    })

    expect(wrapper.vm.volume).toBeGreaterThan(0)
  })
})
