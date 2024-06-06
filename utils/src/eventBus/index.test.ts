import { EventBus } from ".";

interface TestEvents {
  increment: number;
  decrement: number;
}

describe("EventBus", () => {
  let bus: EventBus<TestEvents>;

  beforeEach(() => {
    bus = new EventBus<TestEvents>();
  });

  test("应该触发 increment 事件并传递正确的载荷", () => {
    const mockListener = jest.fn();
    bus.on("increment", mockListener);

    bus.emit("increment", 1);
    expect(mockListener).toHaveBeenCalledWith(1);
  });

  test("应该触发 decrement 事件并响应多个监听器", () => {
    const firstListener = jest.fn();
    const secondListener = jest.fn();

    bus.on("decrement", firstListener);
    bus.on("decrement", secondListener);

    bus.emit("decrement", -1);
    expect(firstListener).toHaveBeenCalledWith(-1);
    expect(secondListener).toHaveBeenCalledWith(-1);
  });

  test("应该正确移除监听器", () => {
    const listener = jest.fn();
    bus.on("decrement", listener);
    bus.emit("decrement", -1);
    expect(listener).toHaveBeenCalledTimes(1);

    bus.off("decrement", listener);
    bus.emit("decrement", -1);
    expect(listener).toHaveBeenCalledTimes(1); // 确保移除后不再调用
  });

  test("如果事件已触发，应该立即触发监听器", () => {
    const mockListener = jest.fn();

    bus.emit("increment", 1);
    bus.on("increment", mockListener, { immediate: true });

    expect(mockListener).toHaveBeenCalledWith(1);
  });

  test("如果事件未触发，不应该立即触发监听器", () => {
    const mockListener = jest.fn();

    bus.on("increment", mockListener, { immediate: true });

    expect(mockListener).not.toHaveBeenCalled();
  });

  test("如果事件已触发然后注册监听器并使用 immediate 选项，应该只触发一次监听器", () => {
    const mockListener = jest.fn();

    bus.emit("increment", 1);
    bus.on("increment", mockListener, { immediate: true });

    expect(mockListener).toHaveBeenCalledTimes(1);
    expect(mockListener).toHaveBeenCalledWith(1);

    bus.emit("increment", 2);
    expect(mockListener).toHaveBeenCalledTimes(2);
    expect(mockListener).toHaveBeenCalledWith(2);
  });

  test("on 返回的函数可以正确解除监听", () => {
    const mockListener = jest.fn();
    const off = bus.on("increment", mockListener);

    bus.emit("increment", 1);
    expect(mockListener).toHaveBeenCalledWith(1);

    off();
    bus.emit("increment", 2);
    expect(mockListener).toHaveBeenCalledTimes(1); // 确保解除监听后不再调用
  });
});
