export default {
	delimiters: ['[[', ']]'],
	props: {
		cases_info: Object
	},
	emits: ['tasks_list'],
	setup(props, {emit}) {
		let show_ongoing = true
		let current_filter = ""
		let asc_desc = true

		async function filter_ongoing(ongoing){
			show_ongoing = ongoing

			if(show_ongoing){
				const res = await fetch('/case/'+props.cases_info.case.id+'/sort_by_ongoing_task')
				let loc = await res.json()
				emit('tasks_list', loc)
			}else{
				const res = await fetch('/case/'+props.cases_info.case.id+'/sort_by_finished_task')
				let loc = await res.json()
				emit('tasks_list', loc)
			}
		}

		function sort_by_title(){
			current_filter = "title"
			asc_desc_filter()
		}

		function sort_by_last_modif(){
			current_filter = "last_modif"
			asc_desc_filter()
		}

		function sort_by_dead_line(){
			current_filter = "dead_line"
			asc_desc_filter()
		}

		function sort_by_status(){
			current_filter = "status_id"
			asc_desc_filter()
		}

		function sort_by_assigned_tasks(){
			current_filter = "assigned_tasks"
			asc_desc_filter()
		}

		function sort_by_my_assignation(){
			current_filter = "my_assignation"
			asc_desc_filter()
		}

		async function asc_desc_filter(change=false){
			if(change)
				asc_desc = !asc_desc

			let res
			if (current_filter){
				if(show_ongoing)
					res = await fetch('/case/'+props.cases_info.case.id+'/tasks/ongoing?filter=' + current_filter)
				else
					res = await fetch('/case/'+props.cases_info.case.id+'/tasks/finished?filter=' + current_filter)
				let loc = await res.json()
				if(asc_desc)
					emit('tasks_list', loc)
				else
					emit('tasks_list', loc.reverse())
			}
			
		}

		
		return {
			filter_ongoing,
			sort_by_last_modif,
			sort_by_title,
			sort_by_dead_line,
			sort_by_status,
			sort_by_assigned_tasks,
			sort_by_my_assignation,
			asc_desc_filter
		}
	},
	template: `
	<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefiltertask" aria-expanded="false" aria-controls="collapsefiltertask">
		filter
	</button>
	<div class="collapse " id="collapsefiltertask">
		<div class="card card-body">
			<div class="d-flex w-100 justify-content-between">
				<div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="radioStatus" id="radioStatusOngoing" @click="filter_ongoing(true)" checked>
						<label class="form-check-label" for="radioStatusOngoing">Ongoing Tasks</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="radioStatus" id="radioStatusFinished" @click="filter_ongoing(false)">
						<label class="form-check-label" for="radioStatusFinished">Finished Tasks</label>
					</div>
				</div>

				<div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="radioOther" id="radioOtherTitle" @click="sort_by_title()">
						<label class="form-check-label" for="radioOtherTitle">Title</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="radioOther" id="radioOrderAsc" @click="sort_by_last_modif()">
						<label class="form-check-label" for="radioOrderAsc">Last Modif</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="radioOther" id="radioOtherDeadLine" @click="sort_by_dead_line()">
						<label class="form-check-label" for="radioOtherDeadLine">Dead line</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="radioOther" id="radioOtherStatus" @click="sort_by_status()">
						<label class="form-check-label" for="radioOtherStatus">Status</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="radioOther" id="radioOtherAssign" @click="sort_by_assigned_tasks()">
						<label class="form-check-label" for="radioOtherAssign">Assigned tasks</label>
					</div>
					<div class="form-check">
						<input class="form-check-input" type="radio" name="radioOther" id="radioOtherCurrentAssign" @click="sort_by_my_assignation()">
						<label class="form-check-label" for="radioOtherCurrentAssign">My assignation</label>
					</div>
				</div>

				<div style="display:flex">
				<span style="margin-right: 10px">Asc</span>
					<div class="form-check form-switch">
						<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" @click="asc_desc_filter(true)">
						<label class="form-check-label" for="flexSwitchCheckDefault">Desc</label>
					</div>
			  
				</div>
			</div>
		</div>
	</div>
	`
}