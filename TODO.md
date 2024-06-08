[x] attr key 的修饰符
[] 'when.#btnA.state.opend.granThan(3).then.changeName(state)' 条件执行语法
[] 'GET:/abc/:id?name=:name' 请求语法
[x] Value 支持对象形式
[] 调整 DSL 外部用 {} 包裹

Flex {
    @initial {

    }
    @children {

    }
    @request {

    }
    @event {

    }
}

[] config 改为初始化 initial

[] slog 本框架不定义状态，状态是交给前端封装组件的时候定义的，并且提供 api