import { Component, OnInit } from '@angular/core';
import { OrchestrationEngine } from '../assets/js/orchestration-engine.js';
// import { WF } from '../assets/json/wf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'orchestator-client';

  ngOnInit(): void {
    this.initOrquestator();
  }

  initOrquestator() {
    var obj = {};

    sessionStorage.setItem("objeto", JSON.stringify(obj));

    var storage = {
        getFromRoute: function(route) {
            var obj = JSON.parse(sessionStorage.getItem("objeto"));
            return obj[route];
        },
        save: function(data) {
            var obj = JSON.parse(sessionStorage.getItem("objeto"));
            obj = data;
            sessionStorage.setItem("objeto", JSON.stringify(obj));
        },
        saveOnRoute: function(route, data) {
            var obj = JSON.parse(sessionStorage.getItem("objeto"));
            obj[route] = data;
            sessionStorage.setItem("objeto", JSON.stringify(obj));
        }
    };

    var json = '{"id":"6ce94be8-abf6-4486-b7c3-2abfddd519dd","name":"workflow de prueba","input":{"nombre":"prueba","identificacion":"123456789","codigo":"1"},"start":"task one","tasks":[{"name":"task choice","type":"CHOICE","caseValueParam":"$.codigo","decisionCases":[{"valueOption":"1","next":"task one","type":"CHOICE_OPTION"},{"valueOption":"2","next":"task two","type":"CHOICE_OPTION"},{"valueOption":"DEFAULT","next":"task three","type":"CHOICE_OPTION"}]},{"name":"task one","type":"HTTP","inputParameters":{"name":"nombre"},"method":"GET","url":"https://jsonplaceholder.typicode.com/todos/1","outputParameters":"task_one","headers":[{"key":"Authorization","value":"123456789"}],"next":"set parameter"},{"name":"task two","type":"HTTP","inputParameters":{"name":"nombre"},"method":"GET","url":"http://localhost:8081/api/va/ping/{name}","outputParameters":"task_one","next":"task finished"},{"name":"set parameter","parameter":"customParameter","value":"Valor de prueba","type":"SET","next":"task finished"},{"name":"task finished","type":"FINISH"}]}';
    OrchestrationEngine.load(json, storage);
    OrchestrationEngine.run();
  }
}
