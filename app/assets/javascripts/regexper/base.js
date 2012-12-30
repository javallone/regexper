define(['regexper'], function(Regexper) {
    var Base = function() {
        this._stack_order = [];
        this._completes = [];
        this._completed = false;
    };

    Regexper.extend(Base.prototype, {
        position: function() {
            throw 'position method is not defined';
        },

        stack: function(relative) {
            var i = 0;

            if (!relative) {
                i = 1;
                relative = this._stack_order[0];
            }

            for (; i < this._stack_order.length; i++) {
                this._stack_order[i].insertAfter(relative);
                relative = this._stack_order[i];
            }
        },

        get_box: function() {
            throw 'get_box method is not defined';
        },

        get_connections: function() {
            var box = this.get_box();

            return {
                left: { x: box.x, y: box.y + box.height / 2 },
                right: { x: box.x2, y: box.y + box.height / 2 }
            };
        },

        complete: function(complete) {
            if (this._completed) {
                complete();
            } else {
                this._completes.push(complete);
            }
        },

        _mark_complete: function() {
            var i;

            this._completed = true;
            for (i = 0; i < this._completes.length; i++) {
                this._completes[i]();
            }
            this._completes = [];
        }
    });

    return Base;
});
