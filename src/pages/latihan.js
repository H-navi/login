import React, {Component} from "react";

export default class Latihan extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        nama: "",
        arrPendidikan: [
          { value: "1", name: "SMA" },
          { value: "2", name: "Diploma" },
          { value: "3", name: "Sarjana" }
        ],
        arrStatus: [
          { value: "1", name: "Pelajar" },
          { value: "2", name: "Pekerja" },
          { value: "3", name: "IRT" }
        ]
      };
    }
  
    handleInput = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
    render() {
      return (
        <div>
          <Input
            labelName="Nama"
            name="nama"
            type="text"
            placeholder="Ketik nama"
            value={this.state.nama}
            onChange={this.handleInput}
          />
          <Select
            labelName="Pendidikan Terakhir"
            name="pendidikan"
            data={this.state.arrPendidikan}
          />
          <Select labelName="Status" name="status" data={this.state.arrStatus} />
        </div>
      );
    }
  }
  