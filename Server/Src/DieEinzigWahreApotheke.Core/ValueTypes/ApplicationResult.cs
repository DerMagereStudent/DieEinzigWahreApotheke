namespace DieEinzigWahreApotheke.Core.ValueTypes;

public class ApplicationResult : ApplicationResult<object> {
	public new static ApplicationResult Success(object data = default!) => new() { Succeeded = true, Data = data};
	public new static ApplicationResult Failed(params ApplicationError[] errors) => new() {
		Succeeded = false, Errors = errors
	};
}

public class ApplicationResult<TData> {
	public bool Succeeded { get; set; }
	public ApplicationError[] Errors { get; set; } = Array.Empty<ApplicationError>();
	public TData? Data { get; set; } = default;

	public static ApplicationResult<TData> Success(TData? data = default) => new() { Succeeded = true, Data = data };
	public static ApplicationResult<TData> Failed(params ApplicationError[] errors) => new() {
		Succeeded = false, Errors = errors
	};
}