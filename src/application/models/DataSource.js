export class DataPointDefinition {
  constructor(json, index) {
    this.name = json.name;
    this.format = json.format;
    this.index = index
  }
}

export class DataSource {
  constructor(json) {
    this.id = json.dataStreamId;
    this.name = json.dataStreamName;
    this.dataPoints = json.dataType.field.map((f, i) => new DataPointDefinition(f, i));
    this.dataTypeName = json.dataType.name;
  }
}