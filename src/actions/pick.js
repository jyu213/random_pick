export const TEST = 'test';

export function test(state) {
    return {
        type: TEST,
        data: state
    };
}